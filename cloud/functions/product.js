const Product = Parse.Object.extend("Product");

Parse.Cloud.define("get-product-list", async (req, res) => {
    const queryProduct = new Parse.Query(Product);

    if (req.params.title != null) {
        // queryProduct.fullText("title", req.params.title);
        queryProduct.matches("title", ".*" + req.params.title + ".*");
    }

    const itemsPerPage = req.params.itemsPerPage || 1;

    if (itemsPerPage > 100) throw new Error("Items per page must be less than 100"); 

    queryProduct.skip(itemsPerPage * req.params.page || 0);
    queryProduct.limit(itemsPerPage);

    const result = await queryProduct.find({ useMasterKey: true })
    
    return result.map(function (product) {
        product = product.toJSON();
        return {
            id: product.objectId,
            title: product.title,
            price: product.price,
            unit: product.unit,
            picture: product.picture != null ? product.picture.url : null,
            description: product.description,
        };
    });
})