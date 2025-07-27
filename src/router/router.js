export default function handleRoutingsPages(path) {
    const router = {
        home: "/",
    }

    const myPlayListE = document.getElementById("myPlayLists");
    if (!myPlayListE) return;

    const homeE = document.getElementById("home");
    if (!homeE) return;

    homeE.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href = router.home;
    })
}

