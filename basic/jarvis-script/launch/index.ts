import CPU from '../../jarvis-core/cpu'

const app = new CPU()

app.use(ctx => {
  ctx.body = {
    rs: 1,
    tip: '这里是返回的内容，utf-8格式中文，不需要转码',
    end: 0
  }
})

app.listen(9000)
