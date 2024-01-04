import Api from '@js/axios/Api.js';
Api.defaults.baseURL = '/api/'
function index() {
    return Api.get('notes');
}

function show(id) {
    return Api.head(`notes/${id}`);
}

function update(id, formData) {
    return Api.patch(`notes/${id}`, formData);
}


function trash(id) {
    return Api.delete(`notes/${id}`);
}

function destroy(id) {
    return Api.delete(`notes/${id}`);
}

function search(text, date) {
    let params = {};
    if (typeof text === 'string' && text.length){
        params.text = text;
    }
    if (typeof date === 'string' && date.length){
        params.datetime = date;
    }

    return Api.get('/search', {params})
}

function store(note) {
    return Api.post('notes', note);
}



export default {index, show, store, update, search, destroy}
