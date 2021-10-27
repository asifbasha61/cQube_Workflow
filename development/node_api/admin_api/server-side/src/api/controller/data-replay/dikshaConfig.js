const router = require('express').Router();
const { logger } = require('../../lib/logger');
const baseDir = process.env.BASE_DIR;
var shell = require('shelljs');

router.post('/', async (req, res) => {
    try {
        logger.info('--- diksha configuration api ---');
        let fromDate = req.body.fromDate;
        let toDate = req.body.toDate;
        let type = req.body.type;
        shell.exec(type == 'Default' ?
            `sudo ${process.env.BASE_DIR}/cqube/emission_app/flaskenv/bin/python ${baseDir}/cqube/emission_app/python/update_processor_property.py diksha_transformer  ${type}` :
            `sudo ${process.env.BASE_DIR}/cqube/emission_app/flaskenv/bin/python ${baseDir}/cqube/emission_app/python/update_processor_property.py diksha_transformer  ${fromDate} ${toDate}`,
            function (code, stdout, stderr) {
                if (!stdout) {
                    logger.error('Program stderr:', stderr);
                    res.status(403).send({ errMsg: "Something went wrong" });
                } else {
                    logger.info('--- diksha configuration api response sent---');
                    res.status(200).send({ msg: `Diksha Dates Configured SuccessFully.` });
                }
            });

    } catch (e) {
        logger.error('--- Internal Server Error ---');
        res.status(500).send({ errMsg: "Internal Server Error" });
    }
})

module.exports = router;