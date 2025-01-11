const roleService = require('../services/roleService');

exports.getAllRoles = (req, res) => {
  roleService.getAllRoles()
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).json({ error: err.message }));
};

exports.getRoleById = (req, res) => {
  const { id } = req.params;
  roleService.getRoleById(id)
      .then(results => {
          if (results) {
              res.status(200).json(results);
          } else {
              res.status(404).json({ error: 'Role not found' });
          }
      })
      .catch(err => res.status(500).json({ error: err.message }));
}