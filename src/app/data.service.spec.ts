import { TestBed, async } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service Test File', () => {
  let dataService: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });

    dataService = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('it will get data', async () => {
    dataService.getData().subscribe((res: any) => {
      expect(res[0]["Course Id"].toString()).toBe('301');
    });
    const req = httpMock.expectOne('https://api.myjson.com/bins/1fq8pm');
    const mockData = [
      {
        "Course Id": 301,
        "Course Name": "Introduction to Artificial Intelligence",
        "Provider": "Udacity",
        "Universities": {
          "Institutions": "Stanford University"
        },
        "Parent Subject": "Computer Science",
        "Child Subject": "Artificial Intelligence",
        "Url": "https://www.ai-class.com/",
        "Next Session Date": "Oct, 2011",
        "Length": 10,
        "Video(Url)": "https://www.youtube.com/watch?feature=player_embedded&v=BnIJ7Ba5Sr4"
      }
    ]

    req.flush(mockData);
    httpMock.verify();
  });

  it('should return undefined if there is empty response from the server', async() => {
    dataService.getData().subscribe((res: any) => {
        expect(res[0]).toBe(undefined);
    });
    const req = httpMock.expectOne('https://api.myjson.com/bins/1fq8pm');
    req.flush('');
    httpMock.verify();
  });

  it('should return undefined if there is empty response object from the server', async() => {
    dataService.getData().subscribe((res: any) => {
        expect(res[0]["Course Id"]).toBe(undefined);
    });
    const req = httpMock.expectOne('https://api.myjson.com/bins/1fq8pm');
    req.flush([{}]);
    httpMock.verify();
  });

});
