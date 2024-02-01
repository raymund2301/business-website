// select elements

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const ul = document.querySelector(".nav_menu");

//sticky navigation using intersection observer api for better performance

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) =>{
    const[entry] = entries;

    if(!entry.isIntersecting) nav.classList.add("header_sticky");
};

const headerObserver = new  IntersectionObserver(stickyNav,{
    root:null,
    threshold:0,
    rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

//page navigational scroll smoothly with event delegation

const sections = document.querySelectorAll("selection");

ul.addEventListener("click",(e) =>{
    e.preventDefault();

    if(e.target.classList.contains("nav_link")){
        const id = e.target.getAttribute("href");

        document.querySelector(id).scrollIntoView({behavior:"smooth"});
        sections.forEach((section)=>(section.type.paddingTop = "100px"));
    }
});

//fading animation with better performance

const allSelections = document.querySelectorAll(".section");

const fadingSection = (entries, observer) => {
    const[entry] = entries;

    if(!entry.isIntersecting)return;
    entry.target.classList.remove("section_hidden");
    observer.unobserve(entry.target);

}

const sectionObserver = new IntersectionObserver(fadingSection,{
    root:null,
    threshold:0.12,
});

allSelections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section_hidden");
});

//mobile menu

const mobileMenu = document.querySelector(".mobile_menu");
const overlay = document.querySelector(".navigation");

const hideMenu = () => {
    overlay.classList.remove("show_menu");
};

mobileMenu.addEventListener("click", showMenu);
overlay.addEventListener("click", hideMenu);
