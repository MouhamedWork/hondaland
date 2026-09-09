/** Smooth-scroll to an in-page section by its DOM id. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Returns a nav handler: smooth-scrolls when already on Home,
 * otherwise navigates to `/#id` (App's HashScroller completes the scroll
 * after Home mounts).
 */
export function createSectionNav(navigate) {
  return (id) => {
    if (window.location.pathname === '/') scrollToId(id)
    else navigate(`/#${id}`)
  }
}