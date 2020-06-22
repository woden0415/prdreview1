// 入口文件
import dva from 'dva';
import createLoading from 'dva-loading';
import model from '@/models';

const app = dva();
app.use(createLoading({
    effect: true
}));

model.forEach((m) => {
    app.model(m);
});

app.router(require('./router').default);
app.start('#app');
