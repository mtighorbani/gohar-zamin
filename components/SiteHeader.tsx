"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Search, Menu, X, Globe2, ChevronDown, Cloud} from "lucide-react";
import {utilityLinks,mainLinks} from "./navigation";

export function SiteHeader(){
 const [menuOpen,setMenuOpen]=useState(false);
 const [searchOpen,setSearchOpen]=useState(false);
 const [languageOpen,setLanguageOpen]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const [query,setQuery]=useState("");
 const searchInput=useRef<HTMLInputElement>(null);
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>80);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
 useEffect(()=>{if(searchOpen)searchInput.current?.focus()},[searchOpen]);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setMenuOpen(false);setSearchOpen(false);setLanguageOpen(false)}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
 const targets=[...mainLinks,...utilityLinks].filter((item,index,all)=>all.findIndex(x=>x.href===item.href)===index);
 const results=(query?targets.filter(x=>x.label.includes(query)):targets.slice(0,4)).slice(0,7);
 return <header className={"site-header"+(scrolled?" condensed":"")}>
  <a className="skip" href="#main-content">رفتن به محتوای اصلی</a>
  <div className="ticker-bar"><div className="ticker-shell">
   <nav className="ticker" aria-label="پیوندهای سازمانی"><div className="ticker-track">
    {[0,1].map(copy=><ul key={copy} className="ticker-group" aria-hidden={copy===1}>
     {utilityLinks.map((item,i)=><li key={item.href} className="ticker-item">
      {copy===0?<Link className={i===0?"ticker-link featured":"ticker-link"} href={item.href}>{item.label}</Link>:<span className={i===0?"ticker-link featured":"ticker-link"}>{item.label}</span>}
     </li>)}
    </ul>)}
   </div></nav><Cloud size={18} aria-hidden="true"/></div></div>
  <div className="main-bar"><div className="header-inner">
   <Link href="/" className="brand"><Image priority width={54} height={54} src="/brand/gohar-mark.svg" alt="نشان فولاد گهرزمین"/><span><strong>شرکت فولاد گهرزمین</strong><small dir="ltr">GOHAR ZAMIN STEEL CO.</small></span></Link>
   <nav className="main-nav" aria-label="منوی اصلی"><ul>{mainLinks.map(item=><li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
   <div className="header-tools"><button type="button" className="language" aria-label="انتخاب زبان" aria-expanded={languageOpen} onClick={()=>{setLanguageOpen(!languageOpen);setSearchOpen(false)}}><Globe2 size={16}/> FA <ChevronDown size={12}/></button>
    <button className="icon-btn" type="button" aria-label={searchOpen?"بستن جست‌وجو":"جست‌وجو"} aria-expanded={searchOpen} onClick={()=>{setSearchOpen(!searchOpen);setLanguageOpen(false)}}>{searchOpen?<X size={20}/>:<Search size={21}/>}</button>
    <button className="icon-btn mobile-btn" type="button" aria-label={menuOpen?"بستن منو":"باز کردن منو"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={23}/>:<Menu size={23}/>}</button>
    {languageOpen&&<div className="language-panel"><strong>فارسی · فعال</strong><span>English · به‌زودی</span></div>}
   </div>
  </div>
  {searchOpen&&<div className="search-panel" role="search"><label htmlFor="quick-search">جست‌وجوی سریع بخش‌های سایت</label><div className="search-input"><Search size={18}/><input id="quick-search" ref={searchInput} value={query} onChange={e=>setQuery(e.target.value)} placeholder="نام بخش را وارد کنید..." type="search"/></div><div className="search-results">{results.length?results.map(x=><Link href={x.href} key={x.href} onClick={()=>setSearchOpen(false)}>{x.label}</Link>):<span>نتیجه‌ای پیدا نشد</span>}</div><small>فعلاً فقط بخش‌های ناوبری جست‌وجو می‌شوند.</small></div>}
  </div>
  {menuOpen&&<nav id="mobile-navigation" className="mobile-navigation" aria-label="منوی موبایل"><strong>منوی اصلی</strong>{mainLinks.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenuOpen(false)}>{x.label}</Link>)}<strong>دسترسی سازمانی</strong>{utilityLinks.map(x=><Link key={x.href} href={x.href} onClick={()=>setMenuOpen(false)}>{x.label}</Link>)}</nav>}
 </header>
}
