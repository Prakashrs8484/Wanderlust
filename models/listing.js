const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review");
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
    geometry :{
       
          type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          },
    },
    // category:{
    //     type:String,
    //     enum:["mountains","arctic","deserts","farms","beaches","forests","islands","cities"],
    //     required:true
    // },
});

listingSchema.post("findOneAndDelete",async function(listing){  //this is a query middleware
    if(listing)
    {
        await Review.deleteMany({reviews:{$in:listing.reviews}});
    }
}
);
const Listing=mongoose.model("listing",listingSchema);
module.exports=Listing;