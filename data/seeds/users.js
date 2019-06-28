exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('hobbits')
    .truncate()
    .then(function() {
      return knex('hobbits').insert([
        { name: 'User1' },
        { name: 'User2' },
        { name: 'User3' },
      ]);
    });
};
