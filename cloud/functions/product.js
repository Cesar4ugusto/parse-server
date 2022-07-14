const Product = Parse.Object.extend("Product");

Parse.Cloud.define("get-product-list", async (req, res) => {
    const queryProduct = new Parse.Query(Product);

    const result = await queryProduct.find({ useMasterKey: true })
    
    return result.map(function (product) {
        product = product.toJSON();
        return {
            id: product.objectId,
            name: product.name,
            price: product.price,
            unit: product.unit,
            picture: product.picture != null ? product.picture.url : null,
            description: product.description,
        };
    });
})