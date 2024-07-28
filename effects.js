const track = document.getElementById("introductions")

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

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;


    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = Math.min(Math.max(nextPercentage, minTranslate), maxTranslate);

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    for (const link of track.getElementsByClassName("img")){
        link.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, {duration: 1200, fill: "forwards"});
    }
}