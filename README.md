# echo_bot

Telegram-бот, который возвращает пользователю отправленные ему сообщения (эхо-бот). Развёрнут в Kubernetes с автоматической сборкой через Jenkins и мониторингом в Prometheus + Grafana.

## 📌 О проекте

Бот принимает любые сообщения от пользователя и возвращает их обратно: текст, стикеры, фото, голосовые, видео и документы. Работает в Kubernetes, автоматически собирается через Jenkins при пуше в `main`.

## ✨ Возможности

- 🔊 **Эхо текста** — возвращает любое текстовое сообщение
- 🎨 **Эхо стикеров** — возвращает стикеры
- 📷 **Эхо фото** — возвращает фотографии
- 🎤 **Эхо голосовых** — возвращает voice-сообщения
- 🎥 **Эхо видео** — возвращает видео
- 📄 **Эхо документов** — возвращает файлы
- 🚀 **CI/CD через Jenkins** — автодеплой при каждом push
- 📦 **Kubernetes** — развёртывание в K8s
- 📊 **Мониторинг** — метрики в Prometheus, дашборды в Grafana
- 🔔 **Алертинг** — уведомления при падении пода в Telegram

## 🛠️ Технологический стек

### Сам бот (этот репозиторий)

| Компонент | Технология |
| :--- | :--- |
| Язык | Node.js 18 |
| Framework | Telegraf 4.x |
| Конфигурация | dotenv |
| Контейнеризация | Docker |
| Реестр образов | Docker Hub (`docin82/echo-bot`) |
| Оркестрация | Kubernetes (Docker Desktop) |
| CI/CD | Jenkins (Kubernetes-агент) |

### Инфраструктура (связанные репозитории)

| Компонент | Технология | Где |
| :--- | :--- | :--- |
| Мониторинг | Prometheus + Grafana | [ansible-monitoring](https://github.com/goncharukinna/ansible-monitoring) |
| Алертинг | Alertmanager → Telegram | [ansible-monitoring](https://github.com/goncharukinna/ansible-monitoring) |
| IaC (для мониторинга) | **Ansible** | [ansible-monitoring](https://github.com/goncharukinna/ansible-monitoring) |

⚠️ **Важно:** Ansible **не управляет** этим ботом. Он используется **отдельно** для развёртывания системы мониторинга (Prometheus, Grafana, Alertmanager). Деплой самого echo-bot выполняет **Jenkins** — см. раздел CI/CD.



