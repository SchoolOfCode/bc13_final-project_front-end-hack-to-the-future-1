import { supabaseAnon, supabaseService } from "../../jest.setup";
import {expect} from '@jest/globals'

const businessUser1 = {
  email: "toxemej433@kaudat.com",
  password: "password123",
};

const businessUser1ID = "0dcb4aaa-4b64-4ee0-882e-a24dabe5abe4";

const businessUser2 = {
  email: "gerago3744@galcake.com",
  password: "password123",
};

describe("Supabase Testing for Profiles Table Row Level Security", () => {
  it("Should not be able to view a profile when not logged in", async () => {
    const { statusText } = await supabaseAnon
      .from("profiles")
      .select()
      .eq("id", businessUser1ID)
      .single();
    expect(statusText).toEqual("Not Acceptable");
  });

  it("Should not be able to create a profile when not logged in", async () => {
    const newProfile = {
      id: "5bade4e6-5383-4bfb-9df4-29a276f4cecb",
      user_type: "consumer",
      full_name: "Test Profile",
    };

    const { statusText } = await supabaseAnon
      .from("profiles")
      .insert(newProfile)
      .select()
      .single();
    expect(statusText).toEqual("Unauthorized");
  });

  it("Should not be able to edit a profile when not logged in", async () => {
    const { statusText } = await supabaseAnon
      .from("profiles")
      .update({
        full_name: "Updated Test Profile",
      })
      .eq("id", businessUser1ID)
      .single();
    expect(statusText).toEqual("Not Acceptable");
  });

  it("Should not be able to delete a profile when not logged in", async () => {
    const { statusText } = await supabaseAnon
      .from("profiles")
      .delete()
      .eq("id", businessUser1ID)
      .single();
    expect(statusText).toEqual("Not Acceptable");
  });

  it("Testing as Business User 1: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser1);
    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 1: Should be able to update a profile assigned to their user_id", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("profiles")
      .update({
        full_name: "Test Business User 1 Updated",
      })
      .eq("id", user?.id)
      .select();
    expect(data![0].full_name).toEqual("Test Business User 1 Updated");
  });

  it("Testing as Business User 1: Reversion Of Edited Profile Name Change Successful", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("profiles")
      .update({
        full_name: "Test Business User 1",
      })
      .eq("id", user?.id)
      .select();
    expect(data![0].full_name).toEqual("Test Business User 1");
  });

  it("Business User 1 Logs Out", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);
  });
});

describe("Supabase Testing for Businesses Table Row Level Security", () => {
  it("Should not be able to create a business while not logged in", async () => {
    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
    };

    const { statusText } = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    expect(statusText).toEqual("Unauthorized");
  });

  it("Testing as Business User 1: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser1);

    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 1: Should be able to create a business while logged in", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();

    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
      user_id: user?.id,
    };

    const businessResponse = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    expect(businessResponse.data).toEqual(
      expect.objectContaining(testBusiness)
    );
  });

  it("Testing as Business User 1: Should be able to update a business assigned to their user_id", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("businesses")
      .update({
        name: "Test Business Updated",
      })
      .eq("user_id", user?.id)
      .select();
    expect(data![0].name).toEqual("Test Business Updated");
  });

  it("Testing as Business User 1: Should be able to delete a business assigned to their user_id", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();
    const { data } = await supabaseAnon
      .from("businesses")
      .delete()
      .eq("user_id", user?.id)
      .select();
    expect(data![0].user_id).toEqual(user?.id);
  });

  it("Business User 1 Creates Another Business For Additional Testing From Business User 2", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();

    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
      user_id: user?.id,
    };

    const businessResponse = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    expect(businessResponse.data).toEqual(
      expect.objectContaining(testBusiness)
    );
  });

  it("Business User 1 Logs Out", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);
  });

  it("Testing as Business User 2: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser2);
    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 2: Should not be able to update a business not assigned to their user_id", async () => {
    const { error } = await supabaseAnon
      .from("businesses")
      .update({
        name: "Test Business Updated",
      })
      .eq("user_id", businessUser1ID)
      .select();

    const { data } = await supabaseAnon
      .from("businesses")
      .select()
      .eq("user_id", businessUser1ID);
    expect(data![0].name).toEqual("Test Business");
  });

  it("Testing as Business User 2: Should not be able to delete a business not assigned to their user_id", async () => {
    const { error } = await supabaseAnon
      .from("businesses")
      .delete()
      .eq("user_id", businessUser1ID)
      .select();

    const { data } = await supabaseAnon
      .from("businesses")
      .select()
      .eq("user_id", businessUser1ID);
    expect(data![0].name).toEqual("Test Business");
  });

  it("Test Conclusion: Successful sign out of Business User 2 and Deletion Of Remaining Test Business", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);

    const { data } = await supabaseService
      .from("businesses")
      .delete()
      .eq("user_id", businessUser1ID)
      .select();
    expect(data![0].user_id).toEqual(businessUser1ID);
  });
});

describe("Supabase Testing for Deals Table Row Level Security", () => {
  let testBusinessID = "";
  let testDealID = "";

  it("Testing as Business User 1: Should be able to login, and be authenticated.", async () => {
    const { data } = await supabaseAnon.auth.signInWithPassword(businessUser1);
    expect(data.session?.user.role).toEqual("authenticated");
  });

  it("Testing as Business User 1: Create A Business For Testing Purposes", async () => {
    const {
      data: { user },
    } = await supabaseAnon.auth.getUser();

    const testBusiness = {
      name: "Test Business",
      website: "www.example.com",
      postcode: "SW1P 4QE",
      lat: 90,
      lon: 90,
      address_line1: "123 Example Street",
      user_id: user?.id,
    };

    const businessResponse = await supabaseAnon
      .from("businesses")
      .insert(testBusiness)
      .select()
      .single();
    testBusinessID = businessResponse.data.id;
    expect(businessResponse.data).toEqual(
      expect.objectContaining(testBusiness)
    );
  });

  it("Testing as Business User 1: Should be able to create a deal", async () => {
    const testDeal = {
      name: "Test Deal",
      business_id: testBusinessID,
      user_id: businessUser1ID,
    };

    const { data } = await supabaseAnon
      .from("deals")
      .insert(testDeal)
      .select()
      .single();
    testDealID = data.id;
    expect(data.name).toEqual("Test Deal");
  });

  it("Testing as Business User 1: Should be able to edit a deal they created", async () => {
    const { data } = await supabaseAnon
      .from("deals")
      .update({
        name: "Updated Test Deal",
      })
      .eq("id", testDealID)
      .select()
      .single();
    expect(data.name).toEqual("Updated Test Deal");
  });

  it("Business User 1 Logs Out", async () => {
    const { error } = await supabaseAnon.auth.signOut();
    expect(error).toEqual(null);
  });

  //Not Logged In Tests
  it("Should not be able to create a deal while not logged in", async () => {
    const testDeal = {
      name: "Test Deal",
    };

    const { statusText } = await supabaseAnon
      .from("deals")
      .insert(testDeal)
      .select()
      .single();
    expect(statusText).toEqual("Unauthorized");
  });

  it("Should not be able to update a deal while not logged in", async () => {
    const response = await supabaseAnon
      .from("deals")
      .update({
        name: "Updated Test Deal Again",
      })
      .eq("id", testDealID)
      .select()
      .single();
    expect(response.statusText).toEqual("Not Acceptable");
  });

  it("Test Conclusion: Deletion Of Remaining Test Business and Deal", async () => {
    const { error } = await supabaseService
      .from("deals")
      .delete()
      .eq("user_id", businessUser1ID)
      .select();

    const { data } = await supabaseService
      .from("businesses")
      .delete()
      .eq("user_id", businessUser1ID)
      .select();
      console.log(data)
    expect(data![0].user_id).toEqual(businessUser1ID);
  });
});
