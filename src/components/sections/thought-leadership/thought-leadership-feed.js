"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Text } from "@/components/ui/text";
import { FeedControlsBody } from "./feed-controls";
import { MobileFilterSheet } from "./mobile-filter-sheet";

const SEARCH_DEBOUNCE_MS = 300;

// Builds the "which post text does the search box match against" string
// once per post (opening + every body paragraph), not on every keystroke —
// posts are static content, so this never changes after mount and is safe
// to memoize for the component's whole lifetime rather than recompute per
// render.
function buildSearchIndex(posts) {
  return new Map(
    posts.map((post) => [post.slug, `${post.opening} ${post.body.join(" ")}`.toLowerCase()]),
  );
}

// Search box, category multi-select, and the filtering logic that drives
// them — but NOT the posts themselves. The actual <FeedEntry> markup for
// every post lives in page.js's own server-rendered <ul>, completely
// outside this component and outside the <Suspense> boundary this
// component sits inside (useSearchParams requires one — see the comment
// at the bottom of this file). This component instead reaches the
// already-rendered <li data-slug="..." data-category="..."> elements
// directly via the DOM and toggles their `hidden` attribute, rather than
// owning their React rendering.
//
// Why not just render the posts here, filtered: a first version did
// exactly that — the whole feed, posts included, became a client
// component gated behind useSearchParams's required Suspense boundary.
// That broke something load-bearing: post content that was previously
// genuine server HTML (zero JavaScript needed to read it, the same
// guarantee every Reveal/TextReveal entrance on this site already
// respects) became JS-only. Confirmed directly against a production
// build's raw HTML: post body text existed only inside the RSC payload's
// serialized script data, never as real rendered <p> markup — invisible
// to a no-JS visitor or a crawler that doesn't execute scripts. The posts
// now never depend on this component resolving at all; only which of the
// always-present posts stay visible does.
//
// Search text and selected categories both live in the URL (?q=...&category=
// a&category=b, a repeatable param for multi-select) so a filtered view can
// be bookmarked or shared. Typing updates the URL after a 300ms debounce
// via router.replace (not push, so rapid typing doesn't spam browser
// history) with { scroll: false } (router navigation scrolls to top by
// default, which would be jarring mid-scroll through a long feed every
// time a filter changes).
export function ThoughtLeadershipFeed({ posts, categories, listSelector }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const urlCategories = useMemo(() => searchParams.getAll("category"), [searchParams]);

  const [query, setQuery] = useState(urlQuery);
  const [isFiltering, setIsFiltering] = useState(false);
  const debounceRef = useRef(null);

  const searchIndex = useMemo(() => buildSearchIndex(posts), [posts]);

  const writeParams = useCallback(
    (nextQuery, nextCategories) => {
      const params = new URLSearchParams();
      if (nextQuery.trim()) params.set("q", nextQuery.trim());
      nextCategories.forEach((id) => params.append("category", id));
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  function handleQueryChange(value) {
    setQuery(value);
    setIsFiltering(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      writeParams(value, urlCategories);
      setIsFiltering(false);
    }, SEARCH_DEBOUNCE_MS);
  }

  function handleToggleCategory(id) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const next = urlCategories.includes(id)
      ? urlCategories.filter((value) => value !== id)
      : [...urlCategories, id];
    writeParams(query, next);
  }

  function handleClearAll() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    setIsFiltering(false);
    writeParams("", []);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const normalizedQuery = urlQuery.trim().toLowerCase();

  const searchMatchedSlugs = useMemo(() => {
    if (!normalizedQuery) return null; // null = "everything matches"
    const matched = new Set();
    for (const post of posts) {
      if (searchIndex.get(post.slug).includes(normalizedQuery)) matched.add(post.slug);
    }
    return matched;
  }, [posts, searchIndex, normalizedQuery]);

  // Per-category counts reflect "how many of the search-matched posts are
  // in this category" — computed before category filtering is applied, so
  // an unselected category's count shows what selecting it would add to
  // the current search results, not a static total.
  const counts = useMemo(() => {
    const map = new Map();
    for (const post of posts) {
      if (searchMatchedSlugs && !searchMatchedSlugs.has(post.slug)) continue;
      map.set(post.category, (map.get(post.category) ?? 0) + 1);
    }
    return map;
  }, [posts, searchMatchedSlugs]);

  const [visibleCount, setVisibleCount] = useState(posts.length);

  // Mirrors isFiltering onto the results container itself (a plain data
  // attribute, not React-rendered style — the container lives in page.js's
  // server HTML, outside this component's own render tree) so the list can
  // fade to signal "about to change" during the one genuinely async window
  // in this feed: the 300ms search debounce. Category toggles have no such
  // window — writeParams fires immediately on click, nothing is pending —
  // so this only ever reflects a real wait, never a fabricated one.
  useEffect(() => {
    const container = document.querySelector(listSelector);
    if (container) container.dataset.filtering = isFiltering ? "true" : "false";
  }, [listSelector, isFiltering]);

  // The actual DOM-visibility effect: queries the already-rendered <li>
  // elements (by the selector the page passes in — see page.js) and sets
  // `hidden` on each one directly, matching data-slug/data-category
  // attributes already present in the server-rendered markup against the
  // current search+category state. Runs whenever that state changes;
  // querying fresh each time (not caching node references) is correct
  // and cheap at this content scale, and avoids a stale-reference bug if
  // the list's own DOM nodes were ever replaced for an unrelated reason.
  useEffect(() => {
    const container = document.querySelector(listSelector);
    if (!container) return;

    let shown = 0;
    for (const node of container.querySelectorAll("[data-slug]")) {
      const slug = node.dataset.slug;
      const category = node.dataset.category;
      const matchesSearch = !searchMatchedSlugs || searchMatchedSlugs.has(slug);
      const matchesCategory = urlCategories.length === 0 || urlCategories.includes(category);
      const visible = matchesSearch && matchesCategory;
      node.hidden = !visible;
      if (visible) shown += 1;
    }
    setVisibleCount(shown);
  }, [listSelector, searchMatchedSlugs, urlCategories]);

  return (
    <div>
      <div className="hidden lg:block">
        <FeedControlsBody
          query={query}
          onQueryChange={handleQueryChange}
          categories={categories}
          selected={urlCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearAll}
          counts={counts}
          isFiltering={isFiltering}
        />
      </div>

      <MobileFilterSheet
        query={query}
        onQueryChange={handleQueryChange}
        categories={categories}
        selected={urlCategories}
        onToggleCategory={handleToggleCategory}
        onClearAll={handleClearAll}
        counts={counts}
        resultCount={visibleCount}
        isFiltering={isFiltering}
      />

      {visibleCount === 0 && (
        <Text variant="reading" muted className="mt-8 sm:mt-10">
          No posts match your search or filters. Try a different term, or clear the selected categories.
        </Text>
      )}
    </div>
  );
}
