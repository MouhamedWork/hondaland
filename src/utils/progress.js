/** Clamp a section's anchor position to the scrollable document range. */
export function getSectionProgress(top, maxScroll) {
  if (maxScroll <= 0) return 0
  return Math.min(1, Math.max(0, top / maxScroll))
}

export function getActiveSection(stops, progress) {
  return stops.reduce((active, stop) => (
    stop.progress <= progress + 0.005 ? stop.id : active
  ), stops[0]?.id)
}
