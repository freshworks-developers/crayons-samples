var client;
var data = {
  columns: [
    {
      key: 'name',
      text: 'Name'
    },
    {
      key: 'group',
      text: 'Group'
    },
    {
      key: 'role',
      text: 'Role'
    }
  ],
  persons: [
    {
      id: '1234',
      name: 'Alexander Goodman',
      role: 'Illustrator',
      group: 'Creative'
    },
    {
      id: '2345',
      name: 'Ambrose Wayne',
      role: 'Director',
      group: 'Management'
    },
    {
      id: '3456',
      name: 'August hines',
      role: 'Sales',
      group: 'Sales'
    }
  ]
};

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', loadValidationScript);
  let datatable = document.getElementById('datatable');
  datatable.columns = data.columns;
  datatable.rows = data.persons;
}

async function loadValidationScript() {
  document.getElementById('clearDetails').addEventListener('click', clearInputfields);
  document.getElementById('createTicket').addEventListener('click', async function validateFields() {
    var title = document.getElementById('title').value;
    var desc = document.getElementById('desc').value;
    var email = document.getElementById('email').value;

    if (title && desc && email) {
      await createFreshdeskTicket(title, desc, email);
    } else {
      await showNotification('danger', 'Ticket Values cannot empty, Fill all values');
    }
  });
}

async function createFreshdeskTicket(title, description, email) {
  try {
    let body = {
      description: `${description}`,
      email: `${email}`,
      priority: 1,
      status: 2,
      subject: `${title}`
    };
    await client.request.invokeTemplate('createTicket', { body: JSON.stringify(body) });
    await showNotification('success', 'Ticket is successfully created');
  } catch (error) {
    console.error(error);
    await showNotification('danger', 'Unable to create ticket');
  }
}

async function showNotification(status, message) {
  client.interface.trigger('showNotify', {
    type: `${status}`,
    message: `${message}`
  });
}

function clearInputfields() {
  document.getElementById('title').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('email').value = '';
}
