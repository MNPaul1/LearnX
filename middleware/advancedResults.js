const advancedRsults = (model, populate) => async (req,res,next) =>{
    let query;

    //Copy req.query
    const reqQuery = {...req.query}

    //Fields to exclude
    const removeFields = ['select','page','limit']

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])


    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators [$qt/$qte...]
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)


    query =  model.find(JSON.parse(queryStr));

    if(req.query.select){
      const selectFields = req.query.select.split(",").join(' ');
      query = query.select(selectFields);
    }

    //Pagination
    const page = parseInt(req.query.page,10)||1;
    const limit = parseInt(req.query.limit,10)||100;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await model.countDocuments();


    query = query.skip(startIndex).limit(limit);

    if (populate){
        query = query.populate(populate)
    }



    const results = await query;

    //Pagination results
    const pagination = {}
    if(endIndex<total){
      pagination.next = {
        page:page+1,
        limit
      }
    }

    if (startIndex>0){
      pagination.prev = {
        page:page-1,
        limit
      }
    }

    res.advancedResults = {
        status:true,
        count:results.length,
        pagination,
        data: results
    }

    next()
}

module.exports = advancedRsults