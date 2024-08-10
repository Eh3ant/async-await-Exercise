
document.addEventListener("DOMContentLoaded", function () {

    const favoriteNumber = 42;

    const favoriteNumbers = [7, 13, 42];

    const numberOfFacts = 4;

    async function getNumbers() {
        const res = await axios.get(`http://numbersapi.com/${favoriteNumber}?json`);
        const div1 = document.querySelector('.fav-num');
        div1.innerHTML = `<p>Fact about number ${favoriteNumber}: ${res.data.text}</p>`;

        const response = await axios.get(`http://numbersapi.com/${favoriteNumbers}?json`);
        const factsDiv = document.querySelector('.number-facts')
        for (const [number, fact] of Object.entries(response.data)) {
            const p = document.createElement('p');
            p.textContent = `Fact about number ${number}: ${fact}`;
            factsDiv.appendChild(p)
        }

        const fourFact = document.querySelector('.four-facts');

        for (let i = 0; i < numberOfFacts; i++) {
            try {
                const resp = await axios.get(`http://numbersapi.com/${favoriteNumber}?json`);
                const fact = resp.data.text

                const p = document.createElement('p')
                p.textContent = ` Fact ${i + 1} about number ${favoriteNumber}: ${fact} `
                fourFact.appendChild(p);
            } catch (e) {
                console.log("Error fetching data from the Numbers API:", e);
            }
        }



    }

    getNumbers();


})




