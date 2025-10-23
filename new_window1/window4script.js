window.addEventListener("DOMContentLoaded", () => {

    // ===== Z-INDEX MANAGEMENT (for stacking order) =====
    let zIndexCounter = 10;
    function getNextZIndex() {
        return ++zIndexCounter;
    }

    // ===== MAKING POPUPS DRAGGABLE =====
    function makeDraggable(popup) {
        const titleBar = popup.querySelector(".popup-titlebar");
        if (!titleBar) return;

        let offsetX, offsetY, isDragging = false;

        titleBar.addEventListener("mousedown", (e) => {
            isDragging = true;
            const rect = popup.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            popup.style.position = "absolute";
            popup.style.zIndex = getNextZIndex();
            document.body.appendChild(popup); // move to top
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            popup.style.left = e.clientX - offsetX + "px";
            popup.style.top = e.clientY - offsetY + "px";
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

    // ===== chat function! =====
    document.querySelectorAll('.popup').forEach(function (popup) {
        const sendBtn = popup.querySelector('.send-btn');
        const textarea = popup.querySelector('textarea');
        const content = popup.querySelector('.popup-content');

        if (sendBtn && textarea && content) {

            const allResponses = [
                "it was crazy..",
                "kinda terrifying :/",
                "i hope u r okay after that",
                "that's ok tho",
                "you don't know?",
                "idk im kinda scared of what's going to happen.."
            ];
            let available = [...allResponses];
            let isBlocked = false;

            sendBtn.addEventListener('click', sendMessage);
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            function sendMessage() {
                const userText = textarea.value.trim();
                if (!userText) return;

                const userMsg = document.createElement('p');
                userMsg.innerHTML = `<span class="user-red">&lt;user900010&gt;</span> ${userText}`;
                content.appendChild(userMsg);
                textarea.value = '';
                content.scrollTop = content.scrollHeight;

                if (isBlocked) {
                    setTimeout(() => {
                        const failMsg = document.createElement('p');
                        failMsg.style.color = "gray";
                        failMsg.innerHTML = `<span class="user-system">&lt;system&gt;</span> Message failed to send — servers remain blocked. boohoo`;
                        content.appendChild(failMsg);
                        content.scrollTop = content.scrollHeight;
                    }, 300);
                    return;
                }

                if (Math.random() < 0.2) {
                    setTimeout(() => {
                        const errorMsg = document.createElement('p');
                        errorMsg.style.color = "gray";
                        errorMsg.innerHTML = `<span class="user-system">&lt;system&gt;</span> Message failed to send;p`;
                        content.appendChild(errorMsg);
                        content.scrollTop = content.scrollHeight;
                        isBlocked = true;
                    }, 500);
                    return;
                }

                setTimeout(() => {
                    if (available.length === 0) available = [...allResponses];
                    const index = Math.floor(Math.random() * available.length);
                    const botText = available.splice(index, 1)[0];

                    const botMsg = document.createElement('p');
                    botMsg.innerHTML = `<span class="user-blue">&lt;bronzygarlic&gt;</span> ${botText}`;
                    content.appendChild(botMsg);
                    content.scrollTop = content.scrollHeight;
                }, 500);
            }
        }

        // Close button
        const closeBtn = popup.querySelector('.close-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => popup.style.display = 'none');

        makeDraggable(popup);
    });

    // ===== DRAGGABLE FILES (MY DOCUMENTS) =====
function makeFileDraggable(file) {
    const parent = file.parentElement; // drag constrained to parent
    file.style.position = "absolute";

    let offsetX, offsetY, isDragging = false;

    file.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;

        const rect = file.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        file.style.zIndex = getNextZIndex();
    });

    function moveAt(pageX, pageY) {
        const parentRect = parent.getBoundingClientRect();
        let left = pageX - parentRect.left - offsetX;
        let top = pageY - parentRect.top - offsetY;

        // Constrain inside parent
        left = Math.max(0, Math.min(left, parentRect.width - file.offsetWidth));
        top = Math.max(0, Math.min(top, parentRect.height - file.offsetHeight));

        file.style.left = left + "px";
        file.style.top = top + "px";
    }

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        moveAt(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) isDragging = false;
    });

    file.ondragstart = () => false;
}

document.querySelectorAll("#my-documents .file-item").forEach(makeFileDraggable);

    // ===== OPEN WINDOWS FUNCTION =====
function openWindow(templateId) {
    const template = document.getElementById(templateId);
    if (!template) return console.error("Popup not found:", templateId);

    const clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.style.position = "absolute";
    clone.style.left = 100 + Math.random() * 200 + "px";
    clone.style.top = 100 + Math.random() * 200 + "px";
    clone.style.zIndex = getNextZIndex();

    document.body.appendChild(clone);

    // ===== DELAYED BSOD (ERROR SCREEN) =====
    if (templateId === "notepad") {
        setTimeout(() => {
            const bsod = document.getElementById("bsod-screen");
            if (bsod) bsod.style.display = "block";
        }, 5000);
    }

    // ===== blinking cursor (_) (for BSOD) =====
    const cursor = document.getElementById("bsod-cursor");
    if (cursor) {
        setInterval(() => {
            cursor.style.visibility = (cursor.style.visibility === "hidden") ? "visible" : "visible";
        }, 500);
    }

    // ===== CLOSE BUTTON =====
    const closeBtn = clone.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("mousedown", (e) => e.stopPropagation());
        closeBtn.addEventListener("click", () => clone.remove());
    }

    // ===== MAKE WINDOW DRAGGABLE =====
    makeDraggable(clone);
    clone.addEventListener("mousedown", () => clone.style.zIndex = getNextZIndex());

    // ===== TEXTAREA (for Notepad) =====
    const textarea = clone.querySelector(".notepad-text");
    if (textarea) textarea.focus();

    // ===== ENABLE PHOTO DOUBLE-CLICK (MY PICTURES) =====
    if (templateId === "my-pictures") {
        const photoItems = clone.querySelectorAll(".file-item");
        photoItems.forEach((item) => {
            const src = item.getAttribute("data-photo");
            const label = item.querySelector("span").textContent.trim();
            item.addEventListener("dblclick", () => {
                openPhotoViewer(src, label);
            });
        });
    }
}

// ===== OPEN PHOTO VIEWER =====
function openPhotoViewer(src, caption) {
    const viewer = document.getElementById("photo-viewer");
    const img = document.getElementById("photo-viewer-img");
    const cap = document.getElementById("photo-viewer-caption");
    const title = document.getElementById("photo-viewer-title");

    img.src = src;
    cap.textContent = caption;
    title.textContent = caption + " - Photo Viewer";

    viewer.style.display = "block";
    viewer.style.position = "absolute";
    viewer.style.left = 150 + Math.random() * 150 + "px";
    viewer.style.top = 120 + Math.random() * 150 + "px";
    viewer.style.zIndex = getNextZIndex();

    document.body.appendChild(viewer);
    makeDraggable(viewer);

    const closeBtn = viewer.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("mousedown", (e) => e.stopPropagation());
        closeBtn.addEventListener("click", () => viewer.style.display = "none");
    }
}

// ===== ADD DOUBLE-CLICK FOR PHOTOS =====
const myPicturesPopup = document.getElementById("my-pictures");
if (myPicturesPopup) {
    const photoItems = myPicturesPopup.querySelectorAll(".file-item");
    photoItems.forEach((item) => {
        const src = item.getAttribute("data-photo");
        const label = item.querySelector("span").textContent.trim();

        item.addEventListener("dblclick", () => {
            openPhotoViewer(src, label);
        });
    });
}


    // ===== DOUBLE-CLICK FOR FILES =====
    function makeFileClickable(file, templateId) {
    let isDragging = false;

    file.addEventListener("mousedown", () => { isDragging = false; });
    file.addEventListener("mousemove", () => { isDragging = true; });
    file.addEventListener("dblclick", () => {
        if (!isDragging) openWindow(templateId);
    });
}

const docWindow = document.getElementById("my-documents");
const files = docWindow.querySelectorAll(".file-item");
makeFileClickable(files[0], "my-pictures"); // My Pictures
makeFileClickable(files[1], "notepad");      // BIG_gathering_plans.TXT



});
