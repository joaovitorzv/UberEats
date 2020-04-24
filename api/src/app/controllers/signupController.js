const Restaurant = require('../models/Restaurant');
const Yup = require('yup');

class signupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().min(6).required(),
      restaurant_name: Yup.string().required(),
      restaurant_address: Yup.string().required(),
      restaurant_city: Yup.string().required(),
      culinary: Yup.string().required()
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Form validation error' });
    }

    const email = req.body.email;

    if (await Restaurant.findOne({ where: { email }})) {
      return res.status(400).json({ error: 'This email is already registered'})
    }

    const { 
      name,
      password, 
      restaurant_name, 
      restaurant_address, 
      restaurant_city,
      culinary
    } = req.body;

    await Restaurant.create({
      name,
      email,
      password,
      restaurant_name,
      restaurant_address,
      restaurant_city,
      culinary,
    });

    return res.status(204).json();
  }
}

module.exports = new signupController();