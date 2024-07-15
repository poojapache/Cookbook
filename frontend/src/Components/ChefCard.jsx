import React from "react";

export default function ChefCard({chef, showChefDetails}) {
    return (
        <div className="chef-card">
            <img className="chef-img" src={chef.url} alt={chef.name} />
            <p className="chef-link"  onClick={() => showChefDetails(chef)}>{chef.name}</p>
        </div>
        
    );
}
