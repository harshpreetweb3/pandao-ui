const Aboutus = () => {
    return ( <div className="pt-20 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100%  border-b-2 border-purple-800 text-white">
        <div className="min-h-screen p-5">
      
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
    
          {/* Company Overview */}
          <section>
            <h2 className="text-3xl font-bold mt-4 mb-2">Who We Are</h2>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non accumsan nunc. Mauris
              sodales elit sapien, a facilisis enim congue vitae. Duis finibus in leo eget volutpat.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Duis at consectetur lorem donec massa sapien, faucibus et molestie ac, convallis non ante.
            </p>
          </section>
    
          {/* Mission Statement */}
          <section>
            <h2 className="text-3xl font-bold mt-6 mb-2">Our Mission</h2>
            <p className="mt-2">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat
              eleifend leo.
            </p>
          </section>
    
          {/* Co-founder Section */}
          <section className="flex flex-col items-center mt-6">
            <h2 className="text-3xl font-bold mb-2">Meet Our Founder</h2>
            <img src="path_to_image.jpg" alt="Co-Founder Name" className="w-48 h-48 rounded-full mt-4 mb-2" />
            <p className="text-lg">
              <strong>Co-Founder Name</strong>
              <br />
              Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,
              commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum,
              eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
            </p>
          </section>
        </div>
      
    </div> );
}
 
export default Aboutus;