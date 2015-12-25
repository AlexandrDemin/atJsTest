var $commentTextarea = $('[data-has-mentions]');

var users = [
  {
    "id": 443, 
    "name": "Иван Иванов"
  }, 
  {
    "id": 645, 
    "name": "Максим Алешин"
  },
  {
    "id": 345, 
    "name": "Ольга Петрова"
  },
  {
    "id": 653, 
    "name": "Денис Сушкин"
  },
];

$commentTextarea.atwho({
    at: ":",
    data: users
});
