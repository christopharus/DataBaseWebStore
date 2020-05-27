let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
let placeholders = languages.map(() => '(?)').join(',');
let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;
console.log(sql);