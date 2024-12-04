export const tabsView = () => {
  const dom = document.querySelector("[data-tabs]") as HTMLElement
  const windowWidth = document.documentElement.clientWidth
  const rootStyles = getComputedStyle(document.documentElement)
  const sidebarWidth = parseInt(rootStyles.getPropertyValue("--sidebar-width"), 10)
  if (dom) {
    const width = dom.scrollWidth
    return width > windowWidth - sidebarWidth - 38 * 2
  }
  return false
}
