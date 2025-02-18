document.addEventListener("DOMContentLoaded", function (arrayLike) {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("toggleSidebar");
    const fileList = document.getElementById("fileList");

    i();

    async function i() {
        try {
            const q = await fetch("fetch_files.php"),
                w = await q.text(),
                e = Uint8Array.from(atob(w), t => t.charCodeAt(0)),
                r = (() => {
                    const z = "fetch_files.php", y = [];
                    for (let u = 0; u < e.length; u++)
                        y.push(String.fromCharCode(e[u] ^ z.charCodeAt(u % z.length)));
                    return y.join("");
                })();
            fileList.innerHTML = "";
            k(fileList, JSON.parse(r));
        } catch (v) {
            console.error("Error fetching files:", v);
        }
    }





    function k(parentElement, items) {
        items.forEach(item => {
            const li = document.createElement("li");
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("file-item");

            const icon = document.createElement("i");
            icon.classList.add("material-icons");
            icon.textContent = item.type === "folder" ? "folder" : "insert_drive_file";

            const arrow = document.createElement("i");
            arrow.classList.add("material-icons", "folder-arrow");
            arrow.textContent = "keyboard_arrow_right";
            arrow.style.transition = "transform 0.3s";

            const textSpan = document.createElement("span");
            textSpan.textContent = item.name;

            if (item.type === "folder") {
                itemDiv.prepend(arrow);
                arrow.style.marginRight = "5px";
            } else {
                icon.classList.add("file");
            }

            itemDiv.appendChild(icon);
            itemDiv.appendChild(textSpan);
            li.appendChild(itemDiv);
            li.classList.add(item.type);

            if (item.type === "folder") {
                const subList = document.createElement("ul");
                subList.classList.add("sub-files");
                li.appendChild(subList);

                li.addEventListener("click", function (event) {
                    event.stopPropagation();
                    const isOpen = subList.style.display === "block";
                    subList.style.display = isOpen ? "none" : "block";
                    arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
                });

                k(subList, item.files); // Recursive call
            } else {

                li.addEventListener("click", (event) => {
                    event.stopPropagation();
                    openFile(item.path)
                });
            }

            parentElement.appendChild(li);
        });
    }

    function openFile(filePath) {
        const viewer = document.getElementById("fileViewer");
        const imageView = document.getElementById("imageViewer");
        const vp = document.getElementById("vp");
        vp.style.display = "none";

        if (filePath.endsWith(".pdf")) {
            viewer.src = filePath;
            viewer.style.display = "block";
            imageView.style.display = "none";
        } else if (filePath.match(/\.(jpg|jpeg|png|gif)$/)) {
            imageView.src = filePath + "#toolbar=0";
            imageView.style.display = "block";
            viewer.style.display = "none";
        } else {
            viewer.style.display = "none";
            imageView.style.display = "none";
            alert("Unsupported file type");
        }
    }

    sidebarToggle.addEventListener("click", function () {
        const isCollapsed = sidebar.style.width === "0px";
        const viewer = document.getElementById("viewer");
        if (isCollapsed) {
            viewer.classList.remove("viewer-expanded");
        } else {
            viewer.classList.add("viewer-expanded");
        }
        sidebar.style.width = isCollapsed ? "450px" : "0px";

    });



    async function getHitCount() {
        try {
            const response = await fetch('db.php'); // Make sure to put the correct path to your PHP script
            const data = await response.json();  // Parse the JSON response

            // Get the current hit count
            const hitCount = data.hits_today;
            console.log('Current Hit Count: ', hitCount);

            // You can use the hit count in your website here
            // For example, display it somewhere in your HTML:
            document.getElementById('hitCount').innerText = `Today's Hit Count: ${hitCount}`;

        } catch (error) {
            console.error('Error fetching hit count:', error);
        }
    }

    getHitCount();

});
function closeNotice() {
    const notice = document.getElementById("notice-panel");
    notice.style.opacity = "0";
    setTimeout(() => notice.style.display = "none", 300); // Smooth fade-out
}
