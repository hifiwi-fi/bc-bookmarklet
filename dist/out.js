// <define:DATA>
var define_DATA_default = { bookmarklet: `javascript:((()=>{var a={ver:"1.0.3"};var p=t=>t?.innerText??t?.textContent??"";var P=[".instapaper_title","article h1",".entry-content h1",".markdown-body h1",".entry-title",".post-title",".pageTitle",".post_title",".headline h1",".headline",".story h1",".entry-header h1",".news_title","#page-post h1",".postheader h1",".postheader h2",".type-post h1"],m=t=>t.replace(/\\r?\\n/g,"").replace(/\\s+/g," ").trim().substring(0,255),w="GitHub - ",f=t=>{let e=t;return e=(/^[^|\\-/\u2022\u2014]+/.exec(e)||[])[0]||e,e=(((e||"").match(/:(?<documentTitle>.*)/)||[]).groups||"").documentTitle||e,e=(e||"").trim(),e},W=t=>{for(let e of P){let o=p(t.querySelector(e))?.trim();if(o&&o.length>0)return o}};function T({document:t}){let e=t.location,o=p(t.querySelector("title"))?.replace(/\\r?\\n/g,"");if(e?.hostname?.endsWith("twitter.com")&&e?.pathname?.includes("/status/")){let l=o.split(': "')[0];return m(l)}if(e?.hostname?.endsWith("github.com")){o.startsWith(w)&&(o=o.replace(w,""));let l=o.split(":");return l.length>1?m(l[0]):m(o)}let r=t.querySelector("meta[property='og:title']")?.content;if(r&&r.length>5&&r.length<100)return m(f(r));let n=t.querySelector("meta[name='twitter:title']")?.content;if(n&&n.length>5&&n.length<100)return m(f(n));let s=W(t);return s&&s.length>5&&s.length<100?m(s):m(f(o))}var g=t=>t?.getAttribute("content")||t?.getAttribute("value");var h=t=>t?.replace(/\\s+/g," ").trim()||"";function S({document:t,title:e}){let o=t.location;if(String(t?.getSelection()))return t.getSelection();if(o?.hostname?.endsWith("twitter.com")&&o?.pathname?.includes("/status/"))return(p(t.querySelector("title"))?.replace(/\\r?\\n/g,"")).split(': "')[1].split('" / Twitter')[0];let r=d(t);return h(b(r?{summary:r,title:e}:{summary:$(t),title:e}))}function b({title:t,summary:e}){return e?.replace(t,"")||e}function d(t){let e=g(t.querySelector("meta[name='description'],meta[description]"));if(e)return h(e);let o=g(t.querySelector("meta[property='og:description']"));if(o)return h(o);let r=g(t.querySelector("meta[name='twitter:description']"));return r?h(r):""}function $(t){return p(t.querySelector("article p"))?.replace(/\\r?\\n/g,"")?.replace(/\\s+/g," ")?.trim()}function x({document:t,title:e,summary:o}){let r=t.location,n=new Set,s=[u(e),u(o)],l=d(t);l&&s.push(u(l));let y=g(t.querySelector('meta[name="keywords"],meta[itemprop="keywords"]'));y&&s.push(u(y));let q=s.join(" ");for(let[i,c]of Object.entries(C))q.includes(i)&&n.add(c);if(r?.hostname?.endsWith("github.com")){if(t.querySelector(".h-card")){n.add("person");let c=t.querySelector(".p-nickname").innerText;c&&n.add(\`gh:\${c}\`)}let i=r?.pathname?.split("/");i.length>=3&&(n.add("repo"),n.add(\`gh:\${i[1]}\`))}if(r?.hostname?.endsWith("twitter.com")){let i=r?.pathname?.split("/");if(r?.pathname?.includes("/status/")&&n.add("tweet"),i.length>=2){let c=i[1];n.add(\`twtr:\${c}\`)}}for(let[i,c]of Object.entries(D))(i instanceof RegExp?i:new RegExp("\\\\b"+i+"\\\\b","i")).test(t?.location?.href)&&n.add(c);return Array.from(n)}function u(t){return t.toLowerCase()}var C={javascript:"javascript",js:"javascript",clojure:"clojure",clj:"clojure",clojurescript:"clojurescript",cljs:"clojurescript",python:"python",ios:"ios",video:"video",books:"book",book:"book"},D={"medium.com/([^/]+)$":"blog","medium.com/([^/]+)/.*":"blog-posting","stackoverflow.com/questions/\\\\d+/[^/]+/\\\\d+":"answer","stackoverflow.com/questions/\\\\d+/[^/]+/?$":"question","nytimes.com":"article","washingtonpost.com":"article","youtube.com/watch":"video","vimeo.com/\\\\d+":"video","imdb.com/title":"movie","imdb.com/name":"person","news.ycombinator.com/item":"comment","reddit.com":"comment","blog.":"blog","schema.org/\\\\S+":"type","goodreads.com/book/show/":"book"};function j(t){let e=T({document:t}),o=S({document:t,title:e}),r=x({document:t,title:e,summary:o});return{title:e,summary:o,tags:r}}var{ver:M}=a,O=680,R=710,A=location.href,{title:_,summary:E,tags:K}=j(document),k=new URLSearchParams({url:A,title:_,note:E,ver:M,jump:"close"});for(let t of K)k.append("tags",t);window.open(\`TRANSPORT://HOST/bookmarks/add?\${k.toString()}\`,"WINDOW_TITLE",\`toolbar=no,width=\${R},height=\${O}\`);})())` };

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
