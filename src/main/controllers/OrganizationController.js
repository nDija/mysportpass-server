import Organization from '../models/Organization.js';

/**
 * OrganizationController.js
 *
 * @description :: Server-side logic for managing Organisations.
 */
export default {

    /**
     * OrganizationController.list()
     */
    list: function (req, res) {
        Organization.find(function (err, Organisations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Organisation.',
                    error: err
                });
            }
            return res.json(Organisations);
        });
    },

    /**
     * OrganizationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        Organization.findOne({_id: id}, function (err, Organisation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Organization.',
                    error: err
                });
            }
            if (!Organisation) {
                return res.status(404).json({
                    message: 'No such Organization'
                });
            }
            return res.json(Organisation);
        });
    },

    /**
     * OrganizationController.create()
     */
    create: function (req, res) {
        var Organization = new Organization({
			name : req.body.name

        });

        Organization.save(function (err, Organisation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Organization',
                    error: err
                });
            }
            return res.status(201).json(Organisation);
        });
    },

    /**
     * OrganizationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        Organization.findOne({_id: id}, function (err, Organisation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Organization',
                    error: err
                });
            }
            if (!Organisation) {
                return res.status(404).json({
                    message: 'No such Organization'
                });
            }

            Organisation.name = req.body.name ? req.body.name : Organisation.name;
			
            Organisation.save(function (err, Organisation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Organization.',
                        error: err
                    });
                }

                return res.json(Organisation);
            });
        });
    },

    /**
     * OrganizationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Organization.findByIdAndRemove(id, function (err, Organisation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Organization.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
