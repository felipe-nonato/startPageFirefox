/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"L1UJyeGn02jABbbW","label":"reddit","bookmarks":[{"id":"Qpp0sguG13PoqgtM","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"IKFN16tOIpNTk1Rz","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"4eMVp20jyfp9MuJw","label":"social","bookmarks":[{"id":"plzFC8bbLUjvmN1F","label":"Twitter","url":"https://x.com"},{"id":"hM1wgliGZa7sRhlc","label":"Instagram","url":"https://www.instagram.com/"},{"id":"dS8SwASHvPx3kjJJ","label":"Youtube","url":"https://www.youtube.com/"}]},{"id":"ZESFw81VrGiElCCj","label":"dev","bookmarks":[{"id":"LK4urypHeQZqfJBX","label":"Github","url":"https://github.com"},{"id":"LgUmgX1L1ZDNAvtV","label":"Tabnews","url":"https://www.tabnews.com.br/"},{"id":"vFXyCgMhRji7Fo4d","label":"Stack Overflow","url":"https://stackoverflow.com/"}]},{"id":"EZ1wvYUxO073Xcmc","label":"study","bookmarks":[{"id":"X5PgQyg4sJy7IbUk","label":"Presencial","url":"https://presencial.ifpb.edu.br/login/index.php"},{"id":"ft4HZG8NOd1O9052","label":"SUAP","url":"https://suap.ifpb.edu.br/accounts/login/?next=/"},{"id":"2xdH2bvAulafVUqr","label":"Classroom","url":"https://classroom.google.com/"},{"id":"m1oqKC0wrvjSSgM4","label":"Udemy","url":"https://www.udemy.com/"}]},{"id":"Ik0ASeQeK8C9yk0Q","label":"work","bookmarks":[{"id":"hJcABvNqpUXMTzF1","label":"PanoramaBI","url":"http://panoramabi.io"},{"id":"0SRMcbxOL6QT0QdI","label":"API Panorama","url":"http://panoramabi.io:3070"},{"id":"mYXop8DlCmPyP9XM","label":"Sponte","url":"https://www.sponteeducacional.net.br/"},{"id":"H2B1v4o90xQKEsPn","label":"API Sponte","url":"https://api.sponteeducacional.net.br/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
