const router = require('express').Router();
const { logger } = require('../../../lib/logger');
const auth = require('../../../middleware/check-auth');
const s3File = require('../../../lib/reads3File');

router.get('/distWise', auth.authController, async (req, res) => {
    try {
        logger.info('--- diksha chart allData api ---');
        let timePeriod = req.body.timePeriod;
        var fileName = `diksha_tpd/enrolment_progress/district.json`;
        let jsonData = await s3File.readFileConfig(fileName);
        var footer = jsonData['footer'];
        logger.info('--- diksha chart allData api response sent ---');
        // res.send({ chartData, downloadData: jsonData, footer });
        res.send({data: jsonData, downloadData: jsonData });
    } catch (e) {
        logger.error(`Error :: ${e}`)
        res.status(500).json({ errMessage: "Internal error. Please try again!!" });
    }
})

module.exports = router;