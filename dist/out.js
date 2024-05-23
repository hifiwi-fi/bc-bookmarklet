// <define:DATA>
var define_DATA_default = { bookmarklet: `javascript:((()=>{var l={ver:"1.0.9"};var m=t=>t?.innerText??t?.textContent??"";var v=[".instapaper_title","article h1",".entry-content h1",".markdown-body h1",".entry-title",".post-title",".pageTitle",".post_title",".headline h1",".headline",".story h1",".entry-header h1",".news_title","#page-post h1",".postheader h1",".postheader h2",".type-post h1"],p=t=>t.replace(/\\r?\\n/g,"").replace(/\\s+/g," ").trim().substring(0,255),y="GitHub - ",C=t=>{for(let o of v){let e=m(t.querySelector(o))?.trim();if(e&&e.length>0)return e}};function w({document:t}){let o=t.location,e=m(t.querySelector("title"))?.replace(/\\r?\\n/g,"");if(["twitter.com","x.com"].some(s=>o?.hostname?.endsWith(s))&&o?.pathname?.includes("/status/")){let s=e.split(': "')[0];return p(s)}if(o?.hostname?.endsWith("github.com")){e.startsWith(y)&&(e=e.replace(y,""));let s=e.split(":");return s.length>1?p(s[0]):p(e)}let r=t.querySelector("meta[property='og:title']")?.content;if(r&&r.length>5&&r.length<100)return p(r);let n=t.querySelector("meta[name='twitter:title']")?.content;if(n&&n.length>5&&n.length<100)return p(n);let c=C(t);return c&&c.length>5&&c.length<100?p(c):p(e)}var g=t=>t?.getAttribute("content")||t?.getAttribute("value");var h=t=>t?.replace(/\\s+/g," ").trim()||"";function T({document:t,title:o}){let e=t.location,r=String(t?.getSelection());if(r&&r.length>1)return h(r);if(e?.hostname?.endsWith("twitter.com")&&e?.pathname?.includes("/status/"))return(m(t.querySelector("title"))?.replace(/\\r?\\n/g,"")).split(': "')[1].split('" / Twitter')[0];if(e?.hostname?.endsWith("x.com")&&e?.pathname?.includes("/status/"))return(m(t.querySelector("title"))?.replace(/\\r?\\n/g,"")).split(': "')[1].split('" / X')[0];let n=f(t);return h(b(n?{summary:n,title:o}:{summary:P(t),title:o}))}function b({title:t,summary:o}){return o?.replace(t,"")||o}function f(t){let o=g(t.querySelector("meta[name='description'],meta[description]"));if(o)return h(o);let e=g(t.querySelector("meta[property='og:description']"));if(e)return h(e);let r=g(t.querySelector("meta[name='twitter:description']"));return r?h(r):""}function P(t){return m(t.querySelector("article p"))?.replace(/\\r?\\n/g,"")?.replace(/\\s+/g," ")?.trim()}function S({document:t,title:o,summary:e}){let r=t.location,n=new Set,c=[u(o),u(e)],s=f(t);s&&c.push(u(s));let d=g(t.querySelector('meta[name="keywords"],meta[itemprop="keywords"]'));d&&c.push(u(d));let k=c.join(" ");for(let[i,a]of Object.entries(W))k.includes(i)&&n.add(a);if(r?.hostname?.endsWith("github.com")){if(t.querySelector(".h-card")){n.add("person");let a=t.querySelector(".p-nickname").innerText;a&&n.add(\`gh:\${a}\`)}let i=r?.pathname?.split("/");i.length>=3&&(n.add("repo"),n.add(\`gh:\${i[1]}\`))}if(["twitter.com","x.com"].some(i=>r?.hostname?.endsWith(i))){let i=r?.pathname?.split("/");if(r?.pathname?.includes("/status/")&&n.add("tweet"),i.length>=2){let a=i[1];n.add(\`twtr:\${a}\`)}}for(let[i,a]of Object.entries($))(i instanceof RegExp?i:new RegExp("\\\\b"+i+"\\\\b","i")).test(t?.location?.href)&&n.add(a);return Array.from(n)}function u(t){return t.toLowerCase()}var W={javascript:"javascript",js:"javascript",clojure:"clojure",clj:"clojure",clojurescript:"clojurescript",cljs:"clojurescript",python:"python",ios:"ios",video:"video",books:"book",book:"book"},$={"medium.com/([^/]+)$":"blog","medium.com/([^/]+)/.*":"blog-posting","stackoverflow.com/questions/\\\\d+/[^/]+/\\\\d+":"answer","stackoverflow.com/questions/\\\\d+/[^/]+/?$":"question","nytimes.com":"article","washingtonpost.com":"article","youtube.com/watch":"video","vimeo.com/\\\\d+":"video","imdb.com/title":"movie","imdb.com/name":"person","news.ycombinator.com/item":"comment","reddit.com":"comment","blog.":"blog","schema.org/\\\\S+":"type","goodreads.com/book/show/":"book"};function x(t){let o=w({document:t}),e=T({document:t,title:o}),r=S({document:t,title:o,summary:e});return{title:o,summary:e,tags:r}}var{ver:D}=l,M=800,O=710,R=location.href,{title:A,summary:_,tags:E}=x(document),j=new URLSearchParams({url:R,title:A,summary:_,ver:D,jump:"close"});for(let t of E)j.append("tags",t);window.open(\`TRANSPORT://HOST/bookmarks/add?\${j.toString()}\`,"WINDOW_TITLE",\`toolbar=no,width=\${O},height=\${M}\`);})())` };

// scripts/wrapper.js
function getBookmarklet(vars = {}) {
  let { bookmarklet } = define_DATA_default;
  for (const [key, value] of Object.entries(vars)) {
    bookmarklet = bookmarklet.replaceAll(key, value);
  }
  return bookmarklet;
}
export {
  getBookmarklet as default
};
//# sourceMappingURL=out.js.map
