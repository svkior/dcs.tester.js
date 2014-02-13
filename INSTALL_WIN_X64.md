# Инсталляция под Windows 8.1 X64

 1. Нужно зайти на сайт FTDI и скачать драйвера подписанные под X64 и Установить их
 3. Скачать Oracle JDK 1.7 X64 и установить
 4. Поставить git под windows https://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git


Выкачать vertx-2.0.2-final.zip
распаковать в папку C:\vertx
в итоге в папке c:\vertx должна быть папка vertx-2.0.2-final


Сделать файл _netrc
В нем написать

    machine bitbucket.org
    login <username>
    password <password>

в git bash или куда хотите

    $ git clone https://bitbucket.org/tts/dcs.tester.js

    $ cd dcs.tester.js
    $ run.cmd



