using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities;

public static class SensorModels
{
    public static async Task<List<SensorModelDto>> List(ZybachDbContext dbContext)
    {
        var sensorModels = await dbContext.SensorModels
            .Include(x => x.CreateUser)
            .Include(x => x.UpdateUser)
            .AsNoTracking()
            .Select(x => x.AsDto())
            .ToListAsync();

        return sensorModels;
    }
}
