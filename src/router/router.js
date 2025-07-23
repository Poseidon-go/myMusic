export default function handleRoutingsPages(path) {
    const router = {
        home: "/",
        likes: "/likes",

    }

    const myPlayListE = document.getElementById("myPlayLists");
    if (!myPlayListE) return;

    const homeE = document.getElementById("home");
    if (!homeE) return;

    homeE.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href = router.home;
    })


    myPlayListE.addEventListener("click", (event) => {
        // ngăn chặn hành động mặc định của trình duyệt
        event.preventDefault();


        window.location.href = router.likes;
    })


    // Xử lý sự kiện khi người dùng quay lại hoặc tiến tới trang trước
    window.addEventListener("popstate", () => {
        if (window.location.pathname === router.likes) {
            window.location.href = "likes.html";
        } else {
            window.location.href = "index.html";
        }
    });

}

