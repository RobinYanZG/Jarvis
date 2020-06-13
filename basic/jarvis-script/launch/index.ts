import bodyParser from 'koa-bodyparser'

import CPU from '../../jarvis-core/cpu'
import sportKing, { cutoff } from '../../../command/module/sportKing/sportKing.controller'
import Bb from '../../../command/module/sportKing/Bmob'

require('dotenv').config()

const appId = process.env.APP_ID || ''
const secKey = process.env.SECRITY_KEY || ''
Bb.register(appId, secKey)

const app = new CPU()

app.use(bodyParser())

app.use(cutoff)
app.use(sportKing)

app.listen(80)
