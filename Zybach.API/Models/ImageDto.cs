using Microsoft.AspNetCore.Http;

namespace Zybach.API.Models;

public class ImageDto
{
    public IFormFile ImageFile { get; set; }
}