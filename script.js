class VideoList {
    constructor(searchWords, order, listLength, publishedAfter) {
        this.API_KEY = 'AIzaSyDhr2ZXUq_VewZWXqMRWDJJIw3q3kLfFNs';
        this.searchWords = searchWords;
        this.order = order;
        this.listLength = listLength;
        this.publishedAfter = publishedAfter;
    }

    listGenerator(json) {
        const ul = document.createElement('ul');
        ul.classList.add('container');
        json.items.reverse();
        for(const value of json.items) {
            const li = document.createElement('li');
            li.innerHTML = `${value.snippet.title} <br> ${value.snippet.publishedAt}`;
            li.appendChild(this.insertVideo(560, 315, `https://www.youtube.com/embed/${value.id.videoId}`));
            li.classList.add('item');
            ul.appendChild(li);
        }
        document.body.appendChild(ul);
    }

    insertVideo(width, height, src) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', height);
        iframe.setAttribute('src', src);
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        return iframe;
    }

    load() {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.listLength}&q=${this.searchWords}&order=${this.order}&publishedAfter=${this.publishedAfter}&key=${this.API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.listGenerator(json);
            })
            .catch(() => {
                const p = document.createElement('p');
                p.classList.add('err');
                p.innerText = "Sorry, we're having some trouble loading..";
                document.body.appendChild(p);
            })
    }
}

const searchWords = 'javascript|python -basics';
const order = 'date';
const listLength = 15;
const publishedAfter = '2019-08-04T00:00:00Z';

const videoList = new VideoList(searchWords, order, listLength, publishedAfter);
videoList.load();

