import bodyParser from 'koa-bodyparser'

import CPU from '../../jarvis-core/cpu'
import sportKing from '../../../command/module/sportKing/sportKing.controller'

const app = new CPU()

app.use(bodyParser())

app.use(sportKing)

app.listen(9000)
