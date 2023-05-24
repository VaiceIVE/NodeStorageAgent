const StorageService = require('../Services/StorageService')
class StorageController
{
    async UploadFile(req, res, next)    
    {   
         /* #swagger.description = 'Метод для загрузки одного файла в файловую систему'
            
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['file'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Входящий файл',
        } 
            #swagger.responses[200] = {
            description: 'Информация о названии файла в файловой системе хранилища',
            schema: 'FileAdressPlusDate.xlsx'
        } 
        */
        try {
            res.json(req.file.originalname)
        } catch (error) {
            res.json(error)
        }
    }

    async GetFile(req, res, next)
    {
        /* #swagger.description = 'Метод для получения файла по названию из файловой системы хранилища'
            
          #swagger.consumes = ['multipart/form-data']  

            #swagger.responses[200] = {
            description: 'Файл, если есть',
            schema: 'FileAdressPlusDate.xlsx'
        } 
        */
        try {
            const {filename} = req.params

            const readStream = StorageService.GetFile(filename)
            
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            return readStream.pipe(res)
        } catch (error) {
            res.json(error)
        }
    }

    async DownloadByUrl(req, res, next)
    {
        const {url} = req.body

        const {types} = req.body

        const filenames = StorageService.DownloadFiles(url, types)

        res.json(filenames)
    }

    async List(req, res, next)
    {
        res.json(StorageService.List())
    }
}

module.exports = new StorageController()