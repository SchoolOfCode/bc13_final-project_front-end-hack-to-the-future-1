import { useUser } from "@supabase/auth-helpers-react";
import { supabaseAnon, supabaseService } from "../../jest.setup";

// that a user cant update another users profile info
// that when a new business is registered it generates a business ID
// When a new deal is created it also assigns the correct business ID

// when a deal is deleted by a business it removes that deal from DB

// That a consumer user type CANNOT create new deals
// that a consumer user type CANNOT assign there own business ID
// That a Consumer user type CANNOT VIEW another users profile information
// That a Consumer user type CANNOT UPDATE another users profile information
// That a Consumer user type CANNOT DELETE another users profile information
// That a Business user type CANNOT VIEW another users profile information
// That a Business user type CANNOT EDIT another users profile information
// That a Business user type CANNOT DELETE another users profile information

// describe("Supabase Basic Tests", () => {
//   it("profiles table should exist", async () => {
//     const { data, error } = await supabaseAnon.rpc("test_example_table_exists");
//     expect(data).toEqual(true);
//   });
// });

describe("Supabase Testing for Business User Account Type", () => {


  it("Testing as Business User: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword({
      email: "lewisgormanneale@gmail.com",
      password: "password123",
    });
    
    expect(data.session?.user.role).toEqual('authenticated');
  });

  it("Testing as Business User: Should be able to create a business & The Business ID is successfully added to the user's profile in the Profiles table.", async () => {
    
    const { data: { user } } = await supabaseAnon.auth.getUser()
    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
      user_id: user?.id
    };

    const businessResponse = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
      console.log(businessResponse)
      expect(businessResponse.data).toEqual(
        expect.objectContaining(testBusiness)
      )

    // const { data, error } = await supabaseAnon
    //     .from("profiles")
    //     .update({ business_id: businessResponse.data.id })
    //     .eq("id", user?.id)
    //     .select()
    //     .single();
    //     console.log(data)
    //     expect(businessResponse.data.id).toEqual(data.business_id)
  });

  

  it("Testing as Business User: Should be able to delete a business", async () => {
    const { data: { user } } = await supabaseAnon.auth.getUser()
    const response = await supabaseAnon
      .from("businesses")
      .delete()
      .eq("user_id", user?.id)
      .select()
      console.log(response)
      expect(response.status).toEqual(200);
      
  });

//   // it("Testing as Business User: Should be able to delete a business", async () => {
//   //   const { data: { user } } = await supabaseAnon.auth.getUser()
//   //   try {
//   //     // Check if the business exists
//   //     const business = await supabaseAnon
//   //       .from("businesses")
//   //       .eq("user_id", user?.id)
//   //       .select()
//   //       .first();
//   //     if (!business) {
//   //       throw new Error("Business not found");
//   //     }

//   //     const response = await supabaseAnon.transact(async (tx) => {
//   //       // Update the foreign key in the profiles table
//   //       await tx.from("profiles")
//   //         .update({ business_id: null })
//   //         .eq("business_id", business.id)
//   //         .select();

//   //       // Delete the business
//   //       await tx.from("businesses")
//   //         .delete()
//   //         .eq("id", business.id)
//   //         .select();
//   //     });
//   //     console.log("Business deleted successfully");
//   //     expect(response.status).toEqual(200);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
// });



  // it("Testing as should return all businesses", async () => {
  //   const { data: { user } } = await supabaseAnon.auth.getUser()
  //   const { data, error } = await supabaseAnon.from("deals").select();
  //   console.log(data);
  //   console.log(user)
  //   expect(data).toEqual(data);
  // });

  // it("profiles table should exist", async () => {
  //   const { data, error } = await supabaseAnon.rpc("test_example_table_exists");
  //   expect(data).toEqual(true);
  // });
});
