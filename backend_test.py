import requests
import sys
from datetime import datetime
import json

class PetGroomingAPITester:
    def __init__(self, base_url="https://pawspamper.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_booking(self):
        """Test booking creation"""
        booking_data = {
            "name": "Test User",
            "phone": "819-555-0123",
            "email": "test@example.com",
            "petName": "Fluffy",
            "petType": "dog",
            "service": "Bath & Haircut",
            "date": "2024-12-25",
            "time": "10:00",
            "notes": "Test booking for API testing",
            "language": "en"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "bookings",
            200,
            data=booking_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_get_bookings(self):
        """Test getting all bookings"""
        return self.run_test("Get All Bookings", "GET", "bookings", 200)

    def test_get_booking_by_id(self, booking_id):
        """Test getting a specific booking"""
        if not booking_id:
            print("⚠️  Skipping get booking by ID - no booking ID available")
            return False
        
        return self.run_test(
            "Get Booking by ID",
            "GET", 
            f"bookings/{booking_id}",
            200
        )

    def test_update_booking_status(self, booking_id):
        """Test updating booking status"""
        if not booking_id:
            print("⚠️  Skipping update booking status - no booking ID available")
            return False
            
        return self.run_test(
            "Update Booking Status",
            "PATCH",
            f"bookings/{booking_id}/status?status=confirmed",
            200
        )

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating status check
        status_data = {"client_name": "test_client"}
        create_success, _ = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=status_data
        )
        
        # Test getting status checks
        get_success, _ = self.run_test("Get Status Checks", "GET", "status", 200)
        
        return create_success and get_success

def main():
    print("🧪 Starting Pet Grooming API Tests")
    print("=" * 50)
    
    # Setup
    tester = PetGroomingAPITester()
    
    # Test API root
    tester.test_api_root()
    
    # Test status endpoints
    tester.test_status_endpoints()
    
    # Test booking endpoints
    booking_id = tester.test_create_booking()
    tester.test_get_bookings()
    tester.test_get_booking_by_id(booking_id)
    tester.test_update_booking_status(booking_id)
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())