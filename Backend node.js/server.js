const express = require(`express`);
const mongoose = require('mongoose');

const app = express();
const path = require(`path`);


app.use(express.json()); // так сервер будет понимать json которій отправила из формы
app.use(express.static(path.join(__dirname, `public`))); //так подключается папка со статистикой HTML,CSS.js

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/shopApp';

const Product = require('./models/Product');

// Підключення до MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ Підключено до MongoDB');
}).catch((err) => {
    console.error('❌ Помилка підключення до MongoDB:', err);
});

app.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('❌ Помилка:', error);
        res.status(500).json({ message: 'Сервер не зміг отримати товари' });
    }
});

app.post('/add-product', async (req, res) => {
    const { name, price, image, description } = req.body;
    const product = new Product({ name, price, image, description });
    await product.save();
    res.status(201).json(product);
});

// Обработка отправки формы с админки
app.post(`/add-post`, (req, res) => {
    const { title, content } = req.body;
    console.log(`Пост получен`, title, content);
    res.status(200).send({ message: `Пост сохранен` });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});