import { Router } from 'express';

import Controller from '../controllers/companyController.js';


const router = Router();




router.route('/about')
.get(Controller.getAbout)
.post(Controller.addAbout)

router.route('/about/:id')
.put(Controller.updateAbout);


router.route('/contact')
.get(Controller.getContact)
.put(Controller.updateContact);


router.route('/faqCategory')
.get(Controller.getFaqCategory)
.post(Controller.addFaqCategory)

router.route('/faqCategory/:id')
.delete(Controller.deleteFaqCategory);


router.route('/faq')
.get(Controller.getFaq)
.post(Controller.addFaq)

router.route('/faq/:id')
.put(Controller.updateFaq);


router.route('/distributor')
.get(Controller.getDistributor)
.post(Controller.addDistributor)

router.route('/distributor/:id')
.put(Controller.editDistributor)
.delete(Controller.deleteDistributor);




export default router;