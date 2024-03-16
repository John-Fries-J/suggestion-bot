
const Event = require('../structures/Event');
const config = require('../config.json');

module.exports = class extends Event {
    async run() {
    const activities = [
      { name: `${config.bot_name || 'Suggestion bot'}`, type: 'WATCHING' }, 
      { name: 'github.com/peterhanania/reaction-roles', type: 'WATCHING' }
    ];
    this.client.user.setPresence({ status: `${config.bot_status}`, activity: activities[0] });
    let activity = 1; 
}
}
