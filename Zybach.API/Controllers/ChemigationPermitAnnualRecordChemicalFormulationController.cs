﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Zybach.API.Services;
using Zybach.API.Services.Authorization;
using Zybach.EFModels.Entities;
using Zybach.Models.DataTransferObjects;

namespace Zybach.API.Controllers
{
    [ApiController]
    public class ChemigationPermitAnnualRecordChemicalFormulationController : SitkaController<ChemigationPermitAnnualRecordChemicalFormulationController>
    {
        public ChemigationPermitAnnualRecordChemicalFormulationController(ZybachDbContext dbContext, ILogger<ChemigationPermitAnnualRecordChemicalFormulationController> logger,
            KeystoneService keystoneService, IOptions<ZybachConfiguration> zybachConfiguration) : base(dbContext,
            logger, keystoneService, zybachConfiguration)
        {
        }

        [HttpGet("/chemicalFormulations")]
        [ZybachViewFeature]
        public ActionResult<List<ChemicalFormulationDto>> GetChemicalFormulations()
        {
            var chemicalFormulations = _dbContext.ChemicalFormulations.Select(x => x.AsDto()).ToList();
            return Ok(chemicalFormulations);
        }

        [HttpGet("/chemicalUnits")]
        [ZybachViewFeature]
        public ActionResult<IEnumerable<ChemicalUnitDto>> GetChemicalUnits()
        {
            var chemicalUnitsDto = _dbContext.ChemicalUnits.Select(x => x.AsDto()).ToList();
            return Ok(chemicalUnitsDto);
        }

        [HttpGet("/chemigationPermits/{chemigationPermitNumber}/{recordYear}/chemicalFormulations")]
        [ZybachViewFeature]
        public ActionResult<List<ChemigationPermitAnnualRecordChemicalFormulationSimpleDto>> GetChemigationPermitAnnualRecordChemicalFormulationByPermitNumberAndRecordYear([FromRoute] int chemigationPermitNumber, [FromRoute] int recordYear)
        {
            var chemigationPermitAnnualRecordDto = ChemigationPermitAnnualRecords.GetByPermitNumberAndRecordYearAsDetailedDto(_dbContext, chemigationPermitNumber, recordYear);
            if (chemigationPermitAnnualRecordDto == null)
            {
                var notFoundMessage = $"There is no annual record found for Chemigation Permit #{chemigationPermitNumber}, Year {recordYear}!";
                _logger.LogError(notFoundMessage);
                return NotFound(notFoundMessage);
            }

            var chemigationPermitAnnualRecordChemicalFormulations = _dbContext
                .ChemigationPermitAnnualRecordChemicalFormulations
                .Include(x => x.ChemicalFormulation)
                .Include(x => x.ChemicalUnit)
                .Where(x =>
                    x.ChemigationPermitAnnualRecordID ==
                    chemigationPermitAnnualRecordDto.ChemigationPermitAnnualRecordID).Select(x => x.AsSimpleDto())
                .ToList();

            return Ok(chemigationPermitAnnualRecordChemicalFormulations);
        }

        [HttpGet("/chemicalFormulationYearlyTotals")]
        [ZybachViewFeature]
        public ActionResult<List<ChemicalFormulationYearlyTotalDto>> GetChemicalFormulationYearlyTotals()
        {
            var chemigationPermitAnnualRecordChemicalFormulations = _dbContext
                .ChemigationPermitAnnualRecordChemicalFormulations
                .Include(x => x.ChemigationPermitAnnualRecord)
                .Include(x => x.ChemicalFormulation)
                .Include(x => x.ChemicalUnit)
                .ToList();

            var chemicalFormulationYearlyTotals = chemigationPermitAnnualRecordChemicalFormulations
                .GroupBy(x => new
                    { x.ChemigationPermitAnnualRecord.RecordYear, x.ChemicalFormulation, x.ChemicalUnit })
                .Select(x =>
                {
                    var permitAnnualRecordChemicalFormulations = x.Where(z =>
                        z.ChemicalFormulation.ChemicalFormulationID == x.Key.ChemicalFormulation.ChemicalFormulationID &&
                        z.ChemigationPermitAnnualRecord.RecordYear == x.Key.RecordYear &&
                        z.ChemicalUnit.ChemicalUnitID == x.Key.ChemicalUnit.ChemicalUnitID).ToList();

                    return new ChemicalFormulationYearlyTotalDto()
                    {
                        RecordYear = x.Key.RecordYear,
                        ChemicalFormulation = x.Key.ChemicalFormulation.ChemicalFormulationDisplayName,
                        ChemicalUnit = x.Key.ChemicalUnit.AsDto(),
                        TotalApplied = permitAnnualRecordChemicalFormulations
                            .Sum(y => y.TotalApplied ?? 0),
                        AcresTreated = permitAnnualRecordChemicalFormulations
                            .Sum(y => y.AcresTreated)
                    };
                }).ToList();

            return Ok(chemicalFormulationYearlyTotals);
        }
    }
}