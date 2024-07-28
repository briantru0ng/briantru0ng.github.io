const track = document.getElementById("introductions");
const images = document.querySelectorAll("#introductions img");
let imagesLoaded = 0;
const totalImages = images.length;
const loadingScreen = document.getElementById("loading-screen");
const loadingPercentage = document.getElementById("loading-percentage");

// Function to update loading progress
function updateLoadingProgress() {
    imagesLoaded++;

    const percentage = Math.floor((imagesLoaded / totalImages) * 100);

    // Smooth transition for percentage with delay
    const interval = 50; // Interval for updating the percentage
    const delay = 50; // Delay after each increment
    let currentPercentage = parseInt(loadingPercentage.textContent) || 0;
    const increment = Math.ceil((percentage - currentPercentage) / (300 / interval)); // Smooth increment over 300ms

    function animatePercentage() {
        if (currentPercentage < percentage) {
            currentPercentage += increment;
            if (currentPercentage > 100) {
                currentPercentage = 100;
            }
            loadingPercentage.textContent = `${currentPercentage}%`;
            setTimeout(animatePercentage, interval + delay); // Apply delay after each increment
        }
    }

    animatePercentage();

    // If all images are loaded, show 100% and fade out the loading screen
    if (imagesLoaded === totalImages) {
        // Display 100% and log that all images are loaded
        loadingPercentage.textContent = `100%`;
        
    
        // Pause for 750ms to show 100%
        setTimeout(() => {
            // Start fading out the percentage text
            loadingPercentage.style.opacity = 0;
    
            // Start fading out the background after an additional 1 second
            setTimeout(() => {
                loadingScreen.style.opacity = 0; // Fade out the background
                
                // Hide the loading screen after the fade-out is complete
                setTimeout(() => {
                    loadingScreen.style.display = "none"; // Hide the loading screen
                }, 2000); // Delay hiding to allow fade-out
            }, 2000); // Delay before starting to fade out background
        }, 750); // Delay to show the final percentage before starting fade-out

        console.log("All images loaded.");
    }
}

// Listen for image load events and log errors
images.forEach((img) => {
    // Log image loading attempt
    console.log(`Attempting to load image: ${img.src}`);
    img.onload = updateLoadingProgress;
    img.onerror = (err) => {
        console.error(`Error loading image: ${img.src}`, err);
        updateLoadingProgress(); // Call to avoid blocking progress
    };

    // Ensure onload is called for cached images
    if (img.complete) {
        img.onload();
    }

});

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    }, 2000); // Minimum visible time for loading screen
});

const calculateLimits = () => {
    const numberOfImages = track.getElementsByClassName("img").length;
    const imageWidth = 40; // 40vmin
    const gap = 2; // 2vmin
    const totalWidth = numberOfImages * (imageWidth + gap) - gap;

    // Assuming viewport width is 100vmin, so imageWidth + gap is a percentage of that
    const maxTranslate = 0;
    const minTranslate = -totalWidth + imageWidth; // Maximum slide left

    return { maxTranslate, minTranslate };
}

const { maxTranslate, minTranslate } = calculateLimits();

// Helper function to animate the transformation
const animateTransform = (nextPercentage) => {
    const percentage = isNaN(nextPercentage) ? 0 : Math.min(Math.max(nextPercentage, minTranslate), maxTranslate);

    track.animate(
        { transform: `translate(${percentage}%, -50%)` },
        { duration: 1200, fill: 'forwards' }
    );

    for (const link of track.getElementsByClassName("img")) {
        link.animate(
            { objectPosition: `${percentage + 100}% center` },
            { duration: 1200, fill: 'forwards' }
        );
    }

    track.dataset.percentage = percentage;
};

// Mouse events
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    track.dataset.isDragging = "true"; // Set dragging state
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage || 0;
    track.dataset.isDragging = "false"; // Reset dragging state
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0" || track.dataset.isDragging === "false") return;

    const mouseDownAt = parseFloat(track.dataset.mouseDownAt);
    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage || 0) + percentage;

    animateTransform(nextPercentage);
};

// Mouse wheel event
window.onwheel = e => {
    if (track.dataset.isDragging === "true") return; // Skip if dragging is in progress

    const delta = e.deltaY;
    const maxDelta = window.innerWidth / 2;

    const percentage = (delta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.percentage || 0) + percentage;

    animateTransform(nextPercentage);
};

// Touch events
let startX;

track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    track.dataset.isDragging = "true"; // Set dragging state
});

track.addEventListener('touchmove', e => {
    const touchX = e.touches[0].clientX;
    const touchDelta = startX - touchX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (touchDelta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage || 0) + percentage;

    animateTransform(nextPercentage);
});

track.addEventListener('touchend', () => {
    track.dataset.prevPercentage = track.dataset.percentage || 0;
    track.dataset.isDragging = "false"; // Reset dragging state
});