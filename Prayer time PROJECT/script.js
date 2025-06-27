// before the changes, the data that should be shown before the changes
document.getElementById('country').value= "Morocco";
document.getElementById('city').value= "Casablanca";
let date = ()=> {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}
document.getElementById('date').value= date();

axios.get('https://api.aladhan.com/v1//timingsByCity/26-06-2025?city=Casablanca&country=Morocco')
.then(responce => {
    if (responce.status == 200){
        const prayer_timings = responce.data.data.timings;
        for (let pray in prayer_timings){
            const el = document.getElementById(pray);
            if (el) {
                el.innerHTML = `<h4>${el.querySelector('h4').textContent}</h4><p>${prayer_timings[pray]}</p>`;
            }
        }
    }
})


document.getElementById('submit').addEventListener('click', (e)=>{
    e.preventDefault();
    let country = document.getElementById('country').value;
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;

    axios.get(`https://api.aladhan.com/v1//timingsByCity/${date}?city=${city}&country=${country}`)
    .then(responce => {
        if (responce.status == 200){
            const prayer_timings = responce.data.data.timings;
            for (let pray in prayer_timings){

                const elements = document.querySelectorAll(`#${pray}`);
                elements.forEach(el => {
                    // Remove all children except h4
                    Array.from(el.children).forEach(child => {
                        if (child.tagName !== "H4") {
                            el.removeChild(child);
                        }
                    });
                    // Add new content
                    const p = document.createElement('p');
                    p.textContent = prayer_timings[pray];
                    el.appendChild(p);
                });
            }
        }
    })
    
})
