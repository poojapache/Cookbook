import React from "react";
import ChefCard from "./ChefCard";


export default function ChefList({chefs, showChefDetails})
{
   return(
        <div className="chef-list-container">
            {
                 chefs.map((element, index) => (
                    <ChefCard  key={index} chef={element} showChefDetails={showChefDetails}/>
                 ))
            }
        </div>
    );
}