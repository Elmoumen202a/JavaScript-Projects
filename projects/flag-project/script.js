document.getElementById('showFlag').addEventListener('click', function() {
    const country = document.getElementById('countrySelect').value;
    showFlagAndHistory(country);
});

function showFlagAndHistory(country) {
    const flagContainer = document.getElementById('flagContainer');
    const historyContainer = document.getElementById('historyContainer');

    let flagURL = '';
    let history = '';

    switch (country) {
        case 'amazigh':
            flagURL = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Berber_flag.svg';
            history = '“Berber flag”. Originally created by the Berber Academy (Agraw Imazighen) in the 70s, the flag was adopted in 1998 flag of the Berber people by the Amazigh World Congress (CMA, Agraw Amadlan Amazigh). The “ⵣ” symbol is a Tifinagh letter called "yaz" and pronounced [z].';
            break;
        case 'morocco':
            flagURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/2560px-Flag_of_Morocco.svg.png';
            history = 'The flag of Morocco features a red field with a green pentagram in the center. The red color has significant historical importance, representing the descendants of the Islamic prophet Muhammad. The green star, or pentagram, symbolizes the Seal of Solomon. This flag was officially adopted on November 17, 1915.';
            break;
        case 'usa':
            flagURL = 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg';
            history = 'The flag of the United States, also known as the Stars and Stripes, was adopted in 1777.';
            break;
        case 'canada':
            flagURL = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg';
            history = 'The flag of Canada, also known as the Maple Leaf, was adopted in 1965.';
            break;
        case 'germany':
            flagURL = 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg';
            history = 'The flag of Germany was adopted in 1949, with its design rooted in the 19th century.';
            break;
        default:
            flagURL = '';
            history = '';
    }

    flagContainer.innerHTML = flagURL ? `<img src="${flagURL}" alt="${country} flag" class="flag">` : '';
    historyContainer.innerHTML = history ? `<p>${history}</p>` : '';
}
